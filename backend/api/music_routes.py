"""
Music Generation API Routes
FastAPI endpoints for music generation
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from pathlib import Path

from music_generation import (
    generate_music,
    build_music_prompt,
    get_example_prompts,
    download_and_save_audio,
    list_saved_audio,
    audio_handler,
    check_api_status
)
from config import MUSICGEN_MODELS
from utils import logger


# Request/Response Models
class MusicGenerationRequest(BaseModel):
    """Request model for music generation"""
    
    # Simple mode (just text)
    prompt: Optional[str] = Field(None, description="Direct text prompt for music generation")
    
    # Advanced mode (structured input)
    genre: Optional[str] = Field(None, description="Music genre (pop, rock, electronic, etc.)")
    mood: Optional[str] = Field(None, description="Mood (happy, sad, energetic, calm, etc.)")
    instruments: Optional[List[str]] = Field(None, description="List of instruments")
    description: Optional[str] = Field(None, description="Custom description")
    tempo: Optional[str] = Field(None, description="Tempo (fast, slow, moderate)")
    
    # Generation parameters
    duration: int = Field(15, ge=1, le=30, description="Duration in seconds (1-30)")
    model: str = Field("small", description="Model size (small, medium, large)")
    
    # Additional options
    save_locally: bool = Field(True, description="Save audio file locally")
    custom_filename: Optional[str] = Field(None, description="Custom filename for saved audio")
    
    class Config:
        json_schema_extra = {
            "example": {
                "genre": "electronic",
                "mood": "energetic",
                "instruments": ["synth", "drums"],
                "duration": 15,
                "model": "small"
            }
        }


class MusicGenerationResponse(BaseModel):
    """Response model for music generation"""
    success: bool
    audio_url: Optional[str] = None
    local_file: Optional[str] = None
    prompt: Optional[str] = None
    duration: Optional[int] = None
    model: Optional[str] = None
    generation_time: Optional[float] = None
    error: Optional[str] = None


class PromptExampleResponse(BaseModel):
    """Response model for example prompts"""
    examples: List[Dict[str, str]]


class AudioListResponse(BaseModel):
    """Response model for audio file list"""
    count: int
    files: List[Dict[str, Any]]


# Create router
router = APIRouter(prefix="/api/music", tags=["music"])


@router.post("/generate", response_model=MusicGenerationResponse)
async def generate_music_endpoint(
    request: MusicGenerationRequest,
    background_tasks: BackgroundTasks
):
    """
    Generate music based on user input
    
    This endpoint accepts either:
    - Simple mode: Just a text prompt
    - Advanced mode: Structured input (genre, mood, instruments, etc.)
    """
    try:
        # Build prompt from request
        if request.prompt:
            # Simple mode - use direct prompt
            final_prompt = request.prompt
            logger.info("Using direct prompt mode")
        else:
            # Advanced mode - build prompt from structured input
            final_prompt = build_music_prompt(
                genre=request.genre,
                mood=request.mood,
                instruments=request.instruments,
                description=request.description,
                tempo=request.tempo
            )
            logger.info("Using advanced prompt builder")
        
        if not final_prompt:
            raise HTTPException(
                status_code=400,
                detail="Either 'prompt' or structured parameters (genre, mood, etc.) must be provided"
            )
        
        logger.info(f"Generating music with prompt: {final_prompt}")
        
        # Generate music
        result = await generate_music(
            prompt=final_prompt,
            duration=request.duration,
            model=request.model
        )
        
        if not result.get("success"):
            raise HTTPException(
                status_code=500,
                detail=result.get("error", "Music generation failed")
            )
        
        response_data = {
            "success": True,
            "audio_url": result["audio_url"],
            "prompt": final_prompt,
            "duration": request.duration,
            "model": request.model,
            "generation_time": result.get("generation_time")
        }
        
        # Download and save locally if requested
        if request.save_locally:
            # Run download in background to not block response
            background_tasks.add_task(
                download_and_save_audio,
                result["audio_url"],
                final_prompt,
                custom_filename=request.custom_filename
            )
            logger.info("Audio download scheduled in background")
        
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Music generation endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/examples", response_model=PromptExampleResponse)
async def get_prompt_examples():
    """
    Get example prompts for inspiration
    """
    try:
        examples = get_example_prompts()
        return {"examples": examples}
    except Exception as e:
        logger.error(f"Failed to get examples: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/models")
async def get_available_models():
    """
    Get information about available MusicGen models
    """
    try:
        return {"models": MUSICGEN_MODELS}
    except Exception as e:
        logger.error(f"Failed to get models: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/files", response_model=AudioListResponse)
async def list_audio_files():
    """
    List all locally saved audio files
    """
    try:
        files = list_saved_audio()
        return {
            "count": len(files),
            "files": files
        }
    except Exception as e:
        logger.error(f"Failed to list audio files: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{filename}")
async def download_audio_file(filename: str):
    """
    Download a locally saved audio file
    """
    try:
        filepath = audio_handler.get_audio_path(filename)
        
        if not filepath or not filepath.exists():
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        return FileResponse(
            path=filepath,
            media_type="audio/mpeg",
            filename=filename
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to download audio file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/files/{filename}")
async def delete_audio_file(filename: str):
    """
    Delete a locally saved audio file
    """
    try:
        success = audio_handler.delete_audio_file(filename)
        
        if not success:
            raise HTTPException(status_code=404, detail="Audio file not found")
        
        return {"success": True, "message": f"File {filename} deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete audio file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def get_api_status():
    """
    Check API and service status
    """
    try:
        replicate_status = await check_api_status()
        
        return {
            "service": "operational",
            "replicate": replicate_status
        }
    except Exception as e:
        logger.error(f"Status check failed: {str(e)}")
        return {
            "service": "error",
            "error": str(e)
        }


# Health check endpoint
@router.get("/health")
async def health_check():
    """Simple health check"""
    return {"status": "healthy", "service": "music-generation"}