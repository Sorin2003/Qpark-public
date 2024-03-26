from sqlalchemy.orm import Session
import hashlib
from . import models, schemas



def get_user(db: Session, user_id: int):
    """

    :param db: Session Object
    :user_id: int
    :return: User Object 
    """
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    """
    """
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.CreateUser):
    """
    """
    
    h = hashlib.sha384()
    salted_pass = "123" + user.password + "456"
    h.update(b"{salted_pass}")
    password = h.hexdigest()

    db_user = models.User(
            user_name=user.user_name,
            email=user.email,
            phone=user.phone,
            password=password,
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


#----------- GUEST -----------#

def get_guest(db: Session, guest_id: int):
    """ Get a guest account by using the id.

    :param db: Session Object
    :guest_id: int
    :return: Guest Object
    """

    return db.query(models.Guest).filter(models.Guest.id == guest_id).first()

def get_guest_last(db: Session):
    """ Get the last guest account.
        
    :return: Guest Object
    """

    return db.query(models.Guest).order_by(models.Guest.id.desc()).first()

def create_guest(db: Session, guest: schemas.Guest):
    """
    """
    db_guest = models.Guest(phone=guest.phone, email=guest.email)
    db.add(db_guest)
    db.commit()
    db.refresh(db_guest)
    return db_guest


#---------------------------#


def get_parking(db: Session, park_id: int):
    """
    """
    return db.query(models.Parking).filter(models.Parking.id == park_id).first()

def create_parking(db: Session, parking: schemas.CreateParking):
    """
    """
    db_parking = models.Parking(
                location=parking.location,
                owner_id=parking.owner_id,
                interval_occupied_owner=parking.interval_occupied_owner,
            )
    db.add(db_parking)
    db.commit()
    db.refresh(db_parking)
    return db_parking

def get_parking_owner(db: Session, owner_id: int):
    """
    """
    return db.query(models.Parking).filter(models.Parking.owner_id == owner_id).all()

   # return db.query(models.Parking).all()

def get_parking_interval(db: Session, park_id: int):
    """ Get the intervals a parking is occupied in by using the id.


    :param db: Session Object
    :park_id: int
    :return: Parking Object
    """
    return db.query(models.Parking).filter(models.Parking.id == park_id).first().interval_owner


