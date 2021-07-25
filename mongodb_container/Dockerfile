FROM mongo:4

ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD root
ENV MONGO_INITDB_DATABASE chat_app_db

ENV TZ="Asia/Tokyo"
RUN echo $TZ > /etc/timezone

COPY init.js /docker-entrypoint-initdb.d/