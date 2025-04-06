FROM python:3.8-slim

WORKDIR /app

# Install wait-for-it
RUN apt-get update && apt-get install -y wget
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["/usr/local/bin/wait-for-it.sh", "postgres:5432", "--", "python", "app.py"]
