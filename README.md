## Setup

### Backend (terminal 1)

```bash
cd ~/handshake-project
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (terminal 2)

```bash
cd ~/handshake-project/frontend
npm install
npm run dev
```

Visit http://localhost:5173/index
