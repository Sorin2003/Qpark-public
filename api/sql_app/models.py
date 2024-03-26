from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,  Interval 
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null

# Import the base model
from .database import Base


class User(Base):
    """ User model.

        # id - PK
        * user_name - String
        * email - String
        * phone - Integer
        * credits - Integer
        * pass - String (maybe we should hash it?)
        o parking - One to many
        

    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    phone = Column(Integer, unique=True)
    credit = Column(Integer, default=0)
    password = Column(String)
    parking = relationship("Parking", cascade="all, delete") 


class Parking(Base):
    """ Parking model.

        # id - PK
        * location - String
        * owner - One to many
        o interval_owner - One to many 
            - The intervals the owner usually is at home or comes home.
        o occupied_until - String
            - The hour when the driver who occupies the place leaves.
        o last_occupant_phone - Integer

    """

    __tablename__ = "parkings"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True) 
    interval_occupied_owner = Column(String, nullable=True) 
    occupied_until = Column(String, nullable=True)
    last_occupant_phone = Column(Integer, nullable=True)


class Guest(Base):
    """ Guest model.
        
        # id - PK
        * phone - Integer
        o email - String

    """
    
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(Integer)
    email = Column(String, nullable=True)


'''
class TimeInterval(Base):
    """ Interval model.

        # id - PK
        * park_id = One to many Parking
        * day = Integer ( [0, 1, 2, ... 6] each number corresponds to a day) 
        * interval_start = Integer (less than 24)
        * interval_end = Integer (less than 24)

    """
    __tablename__ = "intervals"
    
    id = Column(Integer, primary_key=True, index=True)
    #park_id = Column(Integer, ForeignKey("parkings.id"))
    day = Column(Integer)
    interval_start = Column(Integer)
    interval_end = Column(Integer)
'''



