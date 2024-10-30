from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Playlist(db.Model, SerializerMixin):
  __tablename__ = "playlists" # plural version of the class

  serialize_rules=(
    '-playlist_songs.playlist',
    '-playlist_songs.song.playlist_songs',
    '-playlist_songs.song.playlists',
    '-playlist_songs.song_id',
    '-playlist_songs.playlist_id',
    '-songs'
  )

  id = db.Column(db.Integer(), primary_key=True)
  name = db.Column(db.String(), unique=True)

  playlist_songs = db.relationship("PlaylistSong", back_populates="playlist", cascade="all, delete-orphan")
  songs = db.relationship("Song", secondary="playlist_songs", back_populates="playlists", overlaps="playlist_songs")

  @validates("name")
  def validate_name(self, key, name):
    if name == None:
      raise ValueError("Name must exist")
    elif name == "":
      raise ValueError("Name must not be blank")
    
    return name

  def __repr__(self):
    return f'<Playlist id={self.id} name={self.name}>'
  