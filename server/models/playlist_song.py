from config import db

class PlaylistSong(db.Model):
  __tablename__ = "playlist_songs" # plural version of the class

  id = db.Column(db.Integer(), primary_key=True)
  playlist_id = db.Column(db.Integer(), db.ForeignKey("playlists.id"))
  song_id = db.Column(db.Integer(), db.ForeignKey("songs.id"))

  song = db.relationship("Song", back_populates="playlist_songs")
  playlist = db.relationship("Playlist", back_populates="playlist_songs")

  def __repr__(self):
    return f'<PlaylistSong id={self.id} playlist_id={self.playlist_id} song_id={self.song_id}>'