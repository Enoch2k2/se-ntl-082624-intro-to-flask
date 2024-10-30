from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Song(db.Model, SerializerMixin):
  __tablename__ = "songs" # plural version of the class

  serialize_rules=(
    '-playlist_songs.song',
    '-playlist_songs.playlist.playlist_songs',
    '-playlist_songs.playlist.songs',
    '-playlist_songs.song_id',
    '-playlist_songs.playlist_id',
    '-playlists'
  )

  id = db.Column(db.Integer(), primary_key=True)
  title = db.Column(db.String(), nullable=False)

  playlist_songs = db.relationship("PlaylistSong", back_populates="song", cascade="all, delete-orphan")
  playlists = db.relationship("Playlist", secondary="playlist_songs", back_populates="songs", overlaps="playlist_songs")

  @validates("title")
  def validate_title(self, key, title):
    if title == "":
      raise ValueError("Title cannot be blank")
    return title

  def __repr__(self):
    return f'<Song id={self.id} title={self.title}>'