from config import db

class Playlist(db.Model):
  __tablename__ = "playlists" # plural version of the class

  id = db.Column(db.Integer(), primary_key=True)
  name = db.Column(db.String())

  playlist_songs = db.relationship("PlaylistSong", back_populates="playlist")
  songs = db.relationship("Song", secondary="playlist_songs", back_populates="playlists", overlaps="playlist_songs")


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "songs": [song.to_dict() for song in self.songs]
    }

  def __repr__(self):
    return f'<Playlist id={self.id} name={self.name}>'