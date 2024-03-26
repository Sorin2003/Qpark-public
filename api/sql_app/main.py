from datetime import datetime
from fastapi import Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.sql.expression import false, update, values
from . import crud, models, schemas
from .database import SessionLocal, engine
from http import HTTPStatus
from pydantic import BaseModel
from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import hashlib
from jose import JWTError, jwt
from typing import Optional, Union, List
import smtplib, ssl

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 90


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int


class TokenData(BaseModel):
    username: str


def return_hashed_pass(plain_pass):
    """ Get pain text password and hash it.
    
    :param: str
    :return: hashed password
    """
    h = hashlib.sha384()
    salted_pass = "123" + plain_pass + "456"
    h.update(b"{salted_pass}")
    return h.hexdigest()

def verify_password(plain_pass, hashed_pass):
    """ Return whether the plain text pass is the same with the hashed one.
    
    :param plain_pass: str
    :param hashed_pass: str
    :return bool:
    """
    plain_pass = return_hashed_pass(plain_pass)
    return plain_pass == hashed_pass


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_username(db, username: str):
    return db.query(models.User).filter(models.User.user_name == username).first()
    
def authenticate_user(db, username: str, password: str):
    """ Function to check whether user can authentificate or not.
        
    """
    user = get_user_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)
        ):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
        current_user: models.User = Depends(get_current_user)
        ):
    return current_user

@app.post("/api/token", response_model=Token)
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
        ):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.user_name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_id": user.id,}


@app.get("/api/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db), 
              current_user: models.User = Depends(get_current_active_user)
              ):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found :(")
    return db_user

@app.post("/api/users/", response_model=schemas.User)
def post_user(user: schemas.CreateUser, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)    


class ParkInfoUpdate(BaseModel):
    location: Optional[str]
    interval_occupied_owner: Optional[str]

@app.post("/api/parking/{park_id}")
def update_parking(
        park_id: int,
        park_info: ParkInfoUpdate,
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_active_user)
    ):
    parking = crud.get_parking(db, park_id)
    if parking.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    changes = {}
    if park_info.location is not None or park_info.location != []:
        changes[models.Parking.location] = park_info.location
    
    if park_info.interval_occupied_owner is not None or park_info.interval_occupied_owner != []:
        changes[models.Parking.interval_occupied_owner] = park_info.interval_occupied_owner

    db.query(models.Parking).\
            filter(models.Parking.id == park_id).\
            update(changes)
    db.commit()


class ParkInfo(BaseModel):
    phone: int
    occupied_until: str 
    park_id: int

@app.post("/api/new-park/")
def new_park(
        park_info: ParkInfo,
        db: Session = Depends(get_db),
    ):

    '''
    db_park = db.query(models.Parking)\
                .filter(models.Parking.id == park_info.park_id)\
                .update({models.Parking.occupied_until:park_info.occupied_until}
                ,synchronize_session=False)
    '''
    # SMTP
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "pythondjango38@gmail.com"  # Enter your address
    receiver_email = "" #TODO # Enter receiver address
    password = "jglvcnjzypptdnrq"
    message = f"""\
    Subject: Hi there, someone parked on your spot!

    Hi there, someone parked on your spot until {park_info.occupied_until}.
    Contact: {park_info.phone}
    """

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
    



    changes = {
                models.Parking.occupied_until:park_info.occupied_until, 
                models.Parking.last_occupant_phone:park_info.phone
                }

    db.query(models.Parking).\
       filter(models.Parking.id == park_info.park_id).\
       update(changes)
    db.commit()

    return 

@app.get("/api/parking/{park_id}", response_model=schemas.Parking)
def read_parking(park_id: int, db = Depends(get_db)):
    db_park = crud.get_parking(db, park_id=park_id)
    if db_park is None:
        raise HTTPException(status_code=404, detail="Parking not found :(")
    return db_park

@app.get("/api/owner/parking/{owner_id}", response_model=List[schemas.Parking])
def read_parking_owner(
        owner_id: int, 
        db: Session = Depends(get_db),
        #current_user: models.User = Depends(get_current_active_user)
    ):
    items = crud.get_parking_owner(db=db, owner_id=owner_id)
    return items

@app.post("/api/parking", response_model=schemas.Parking)
def post_parking(parking: schemas.CreateParking, db: Session = Depends(get_db)):
    return crud.create_parking(db=db, parking=parking)



