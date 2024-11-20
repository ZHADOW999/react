from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origin = ["*"]

class Data(BaseModel):
    content: str

test = [{"content":"akeem is great"}, {"content":"he's cool too"}]

@app.get("/")
def main():
    return {"message": "Hello, World!"}


@app.post("/testPost")
def predict(data: Data):
    data_dict = data.model_dump()
    test.append(data_dict)
    print(test)
    return {"message": test}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

