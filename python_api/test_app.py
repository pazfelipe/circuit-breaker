# python_api/test_app.py
import pytest
from app.main import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_status(client):
    rv = client.get("/status")
    assert rv.status_code == 200
    assert b"Python API is running" in rv.data


def test_data(client):
    rv = client.get("/data")
    assert rv.status_code == 200
    assert b"Here is some data from the Python API" in rv.data
