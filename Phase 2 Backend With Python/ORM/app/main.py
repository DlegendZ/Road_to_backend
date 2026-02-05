# from sqlalchemy.orm import declarative_base
# from sqlalchemy import Column, Integer, String, Boolean

# base = declarative_base()

# class user(base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, nullable=False)
#     name = Column(String, nullable=False)
#     is_active = Column(Boolean, default=True)

# user = user(
#     email="a@test.com",
#     name="Alice"
# )

# from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship, declarative_base

# base = declarative_base()

# class User(base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, nullable=False)

#     # tasks = relationship()

# class Task(Base):
#     __tablename__ = "tasks"
#     id = Column(Integer, primary_key=True)
#     title = Column(String, nullable=False)

#     user_id = Column(Integer, ForeignKey("users.id"))
    
#     user = relationship("User", back_populates="tasks")

# from sqlalchemy import Table, Column, Integer, ForeignKey
# from sqlalchemy.orm import declarative_base, relationship

# Base = declarative_base()

# task_assignments = Table(
#     "task_assignments",
#     Base.metadata,
#     Column("user_id", ForeignKey("users.id"),  primary_key=True),
#     Column("task_id", ForeignKey("tasks.id"), primary_key=True),
# )

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True)

#     tasks = relationship("Task", secondary=task_assignments, back_populates="users")

# class Task(Base):
#     __tablename__ = "tasks"

#     id = Column(Integer, primary_key=True)

#     users = relationship("User", secondary=task_assignments, back_populates="tasks")


