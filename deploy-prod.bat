@echo off
echo Rebuilding and restarting production containers...

echo Stopping existing containers...
docker-compose -f docker-compose.prod.yml down

echo Removing old images...
docker-compose -f docker-compose.prod.yml build --no-cache

echo Starting containers...
docker-compose -f docker-compose.prod.yml up -d

echo Checking container status...
docker-compose -f docker-compose.prod.yml ps

echo Production deployment complete!
echo Frontend: http://localhost
echo Backend: http://localhost:5000
echo Admin Panel: http://localhost/admin