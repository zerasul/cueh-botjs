FROM node:stretch-slim
WORKDIR /opt/cuehbot
COPY . /opt/cuehbot
RUN ["npm", "install"]
ENV DISCORD_TOKEN
CMD ["npm", "run", "main"]