from config import db, api
from models.models import Playlist
from flask_restful import Resource


class PlaylistsResource(Resource):
  def get(self):
    playlists = [playlist.to_dict() for playlist in Playlist.query.all()]
    return playlists

api.add_resource(PlaylistsResource, "/api/playlists")