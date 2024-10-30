from config import db

class Song(db.Model):
  __tablename__ = "songs" # plural version of the class

  id = db.Column(db.Integer(), primary_key=True)
  title = db.Column(db.String())

  playlist_songs = db.relationship("PlaylistSong", back_populates="song")
  playlists = db.relationship("Playlist", secondary="playlist_songs", back_populates="songs", overlaps="playlist_songs")

  def __repr__(self):
    return f'<Song id={self.id} title={self.title}>'