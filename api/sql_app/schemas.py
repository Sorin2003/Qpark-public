from typing import Optional, Union
from datetime import time
from pydantic import BaseModel



class BaseGuest(BaseModel):
    phone: int
    email: Optional[str] = None

class CreateGuest(BaseGuest):
    phone: int
    email: Optional[str] = None

class Guest(BaseGuest):
    id: int
   
    class Config:
        orm_mode = True


class BaseTimeInterval(BaseModel):
    id: int
    park_id: int
    day = int
    interval_start: int
    interval_end: int

class CreateTimeInterval(BaseTimeInterval):
    id: int
    park_id: int
    day = int
    interval_start: int
    interval_end: int

class TimeInterval(BaseTimeInterval):
    id: int
    park_id: int
    day = int
    interval_start: int
    interval_end: int

    class Config:
        orm_mode = True




class BaseParking(BaseModel):
    location: str
    owner_id: int
    interval_occupied_owner: str 

class CreateParking(BaseParking):
    location: str
    owner_id: int
    interval_occupied_owner: str 

class Parking(BaseParking):
    id: int
    occupied_until: Optional[str]
    last_occupant_phone: Optional[int]
    class Config:
        orm_mode = True


class BaseUser(BaseModel):
    user_name: str
    email: str
    phone: int

class CreateUser(BaseUser):
    user_name: str
    email: str
    phone: int
    password: str


class User(BaseModel):
    id: int
    user_name: str
    email: str
    phone: int
    credit: int
    parking: list[Parking] = []

    class Config:
        orm_mode = True

