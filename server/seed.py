from config import app, db
from models.models import *

with app.app_context():
  print("deleting data...")

  Playlist.query.delete()
  Song.query.delete()
  PlaylistSong.query.delete()

  db.session.commit()

  print("Seeding data")

  playlist_1 = Playlist(name="Bob's Playlist")
  playlist_2 = Playlist(name="Carnegie's Playlist")
  db.session.add_all([playlist_1, playlist_2])
  db.session.commit()

  song_1 = Song(title="Bob's Adventure")
  song_2 = Song(title="Bob's Misadventures")

  song_3 = Song(title="Without love")
  song_4 = Song(title="Sao Paulo")
  song_5 = Song(title="Taylor Swift")
  db.session.add_all([song_1, song_2, song_3, song_4, song_5])
  db.session.commit()

  playlist_song_1 = PlaylistSong(song_id=song_1.id, playlist_id=playlist_1.id)
  playlist_song_2 = PlaylistSong(song_id=song_2.id, playlist_id=playlist_1.id)
  playlist_song_3 = PlaylistSong(song_id=song_5.id, playlist_id=playlist_1.id)

  playlist_song_4 = PlaylistSong(song_id=song_3.id, playlist_id=playlist_2.id)
  playlist_song_5 = PlaylistSong(song_id=song_4.id, playlist_id=playlist_2.id)
  playlist_song_6 = PlaylistSong(song_id=song_5.id, playlist_id=playlist_2.id)

  db.session.add_all([playlist_song_1, playlist_song_2, playlist_song_3, playlist_song_4, playlist_song_5, playlist_song_6])
  db.session.commit()

  print("Done seeding")