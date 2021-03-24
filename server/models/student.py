from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# pydantic shcema, that represents how student data will be stored in mongodb
# ellipsis, "..." incidates that a field is required. It can be replaced with None or default value
# gt means greater than; lt means less than; le means less than or equal to
class StudentSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    course_of_study: str = Field(...)
    year: int = Field(..., gt=0, lt=9)
    gpa: float = Field(..., le=4.0)

    class Config:
        schema_extra = {
            'example': {
                'fullname': 'John Doe',
                'email': 'jdow@x.edu',
                'course_of_study': 'Computer Science',
                'year': 2,
                'gpa': '3.0'
            }
        }


class UpdateStudentModel(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    course_of_study: Optional[str]
    year: Optional[int]
    gpa: Optional[float]

    class Config:
        schema_extra = {
            'example': {
                'fullname': 'John Doe',
                'email': 'jdow@x.edu',
                'course_of_study': 'Computer Science',
                'year': 4,
                'gpa': '4.0'
            }
        }


def ResponseModel(data, message):
    return{
        'data': [data],
        'code': 200,
        'message': message
    }


def ErrorResponseModel(error, code, message):
    return{
        'error': error,
        'code': code,
        'message': message
    }
