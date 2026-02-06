from app.models import User
from app.database import SessionLocal

session = SessionLocal()

# user1 = User(name="Boss", email="boss@gmail.com")
# session.add(user1)
# session.commit()
# session.close()

# users = session.query(User).all()
# for user in users:
#     print(user.id, user.name, user.email)

# session.close()

# user = session.query(User).filter(User.name == "Boss").first()
# user.email = "newboss@gmail.com"

# session.commit()
# session.close()

# user = session.query(User).filter(User.name == "Boss").first()
# session.delete(user)
# session.commit()
# session.close()
