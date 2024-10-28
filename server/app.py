from config import app

from routes.routes import *

if __name__ == "__main__":
  app.run(port=5555, debug=True)