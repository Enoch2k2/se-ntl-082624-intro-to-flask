from flask import request
from config import db, api
from models.models import PlaylistSong
from flask_restful import Resource


class PlaylistSongsResource(Resource):
  def get(self):
    playlist_songs = [playlist_song.to_dict() for playlist_song in PlaylistSong.query.all()]
    return playlist_songs
  
  def post(self):
    data = request.get_json()
    song_id = data.get("song_id")
    playlist_id = data.get("playlist_id")

    playlist_song = PlaylistSong(song_id=song_id, playlist_id=playlist_id)
    db.session.add(playlist_song)
    db.session.commit()
    return playlist_song.to_dict(), 201



api.add_resource(PlaylistSongsResource, "/api/playlist_songs")