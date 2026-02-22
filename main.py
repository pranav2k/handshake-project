from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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


class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    check_in_time: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/students")
def get_students():
    db = SessionLocal()
    students = db.query(Student).all()
    db.close()
    return [
        {
            "id": s.id,
            "first_name": s.first_name,
            "last_name": s.last_name,
            "check_in_time": s.check_in_time.isoformat() + " UTC",
        }
        for s in students
    ]


@app.post("/api/students")
def create_student(student: StudentCreate):
    db = SessionLocal()
    db.add(Student(
        first_name=student.first_name,
        last_name=student.last_name,
        check_in_time=datetime.fromisoformat(student.check_in_time.replace(" UTC", "")),
    ))
    db.commit()
    db.close()
    return {"ok": True}