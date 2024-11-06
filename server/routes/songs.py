from flask import request, session
from config import db, api
from models.models import Song
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


class SongsResource(Resource):
  def get(self):
    songs = [song.to_dict() for song in Song.query.all()]
    return songs
  
  def post(self):
    if not session.get("user_id"):
      return {"error": "Unauthorized"}, 401

    data = request.get_json()
    title = data.get("title")
    try:
      song = Song(title=title)
      db.session.add(song)
      db.session.commit()
      return song.to_dict(), 201
    except IntegrityError:
      return {"error": "Title has to exist"}, 422
    except ValueError as e:
      return {"error": f'{str(e)}'}, 422

api.add_resource(SongsResource, "/api/songs")