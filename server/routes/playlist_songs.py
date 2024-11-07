from flask import request
from config import db, api
from models.models import PlaylistSong, Playlist
from flask_restful import Resource


class PlaylistSongsResource(Resource):
  def get(self):
    playlist_songs = [playlist_song.to_dict() for playlist_song in PlaylistSong.query.all()]
    return playlist_songs
  
  def post(self):
    data = request.get_json()
    song_id = data.get("song_id")
    playlist_id = data.get("playlist_id")
    playlist = Playlist.query.get(playlist_id)
    order_number = len(playlist.playlist_songs) + 1

    playlist_song = PlaylistSong(song_id=song_id, playlist_id=playlist_id, order_number=order_number)

    db.session.add(playlist_song)
    db.session.commit()

    return playlist_song.to_dict(), 201



api.add_resource(PlaylistSongsResource, "/api/playlist_songs")

class PlaylistSongResource(Resource):
  def patch(self, id):
    ps = PlaylistSong.query.get(id)
    data = request.get_json()
    order_number = data.get("order_number")
    ps.order_number = order_number
    db.session.add(ps)
    db.session.commit()

    return ps.to_dict(), 200


api.add_resource(PlaylistSongResource, "/api/playlist_songs/<int:id>")