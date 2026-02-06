# from app.database import engine
# from app.models import Base

# Base.metadata.create_all(bind=engine)

from app.database import engine, SessionLocal
from app.models import Base, User

Base.metadata.create_all(bind=engine)

# session = SessionLocal()

# user1 = User(name="Boss", email="boss@gmail.com")

# session.add(user1)
# session.commit()
# session.close()

# session = SessionLocal()

# users = session.query(User).all()

# for user in users:
#     print(user.id, user.name, user.email)

# session.close()

# session = SessionLocal()

# user = session.query(User).filter(User.name == "Boss").first()
# print(user.email)

# session.close()

# session = SessionLocal()

# user = session.query(User).filter(User.name == "Boss").first()
# user.email = "newboss@mail.com"

# session.commit()
# session.close()

# session = SessionLocal()

# user = session.query(User).filter(User.name == "Boss").filter()
# session.delete(user)

# session.commit()
# session.close()

