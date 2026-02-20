from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///students.db")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    check_in_time = Column(DateTime, nullable=False)


Base.metadata.create_all(engine)


def seed():
    db = SessionLocal()
    if db.query(Student).count() == 0:
        db.add_all([
            Student(
                first_name="Jim",
                last_name="Hawkins",
                check_in_time=datetime(2021, 2, 15, 19, 35, 0),
            ),
            Student(
                first_name="Sally",
                last_name="Ride",
                check_in_time=datetime(2021, 2, 18, 16, 39, 0),
            ),
        ])
        db.commit()
    db.close()


seed()

app = FastAPI()
templates = Jinja2Templates(directory="templates")


@app.get("/index", response_class=HTMLResponse)
def index(request: Request):
    db = SessionLocal()
    students = db.query(Student).all()
    db.close()
    return templates.TemplateResponse("index.html", {
        "request": request,
        "students": students,
    })
