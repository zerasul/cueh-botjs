FROM node:buster
COPY . /opt/cuehbot
WORKDIR /opt/cuehbot
RUN ["npm", "install"]
ENV DISCORD_TOKEN token
CMD ["npm", "run", "main"]