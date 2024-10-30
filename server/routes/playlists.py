from flask import request
from config import db, api
from models.models import Playlist
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


class PlaylistsResource(Resource):
  def get(self):
    playlists = [playlist.to_dict() for playlist in Playlist.query.all()]
    return playlists
  
  def post(self):
    data = request.get_json()
    name = data.get("name")
    try:
      playlist = Playlist(name=name)
      db.session.add(playlist)
      db.session.commit()
      return playlist.to_dict(), 201
    except IntegrityError:
      return {"error": "Name must be unique"}, 422
    except ValueError as e:
      return {"error": str(e)}, 422

api.add_resource(PlaylistsResource, "/api/playlists")

class PlaylistResource(Resource):
  def get(self, id):
    pl = Playlist.query.get(id)
    if pl:
      return pl.to_dict(), 200
    else:
      return {"error": "Playlist doesn't exist"}, 400
  
  def patch(self, id):
    data = request.get_json()
    pl = Playlist.query.get(id)
    

    try:
      for key in data.keys():
        if hasattr(pl, key):
          setattr(pl, key, data.get(key))
      db.session.add(pl)
      db.session.commit()
      return pl.to_dict(), 201
    except IntegrityError:
      return {"error": "Name must be unique"}, 422
    except ValueError as e:
      return {"error": str(e)}, 422
    
  def delete(self, id):
    pl = Playlist.query.get(id)
    if pl:
      db.session.delete(pl)
      db.session.commit()
      return {}, 204
    else:
      return {"error": "Playlist doesn't exist"}, 400



api.add_resource(PlaylistResource, "/api/playlists/<int:id>")