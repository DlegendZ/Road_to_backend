# def greet(name) :
#     return f"Hello, {name}"

# message = greet("Raynald")
# print(message)

# import math_utils

# result = math_utils.add(1,3)
# print(result)

# from utils.math_utils import add

# print(add(1,4))

# class user:
#     def __init__(self, name, email):
#         self.name = name
#         self.email = email
    
#     def greet(self):
#         return f"Hi, I am {self.name}"
    
# user1 = user("Raynald", "raynaldarvanlim@gmail.com")
# print(user1.greet())

# class admin(user) :
#     def delete_user(self):
#         return "user deleted"
    
# admin_user = admin("admin", "admin@gmail.com")
# print(admin_user.greet())
# print(admin_user.delete_user())

# try:
#     x = int("9")
# except ValueError:
#     print("Conversion Failed")
# else :
#     print(x)
# finally:
#     print("done")

# class userNotFoundError(Exception):
#     pass

# def get_user(user_id):
#     if user_id != 1:
#         raise userNotFoundError("User not found")

