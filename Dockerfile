FROM node:14.3.0-stretch
COPY . /opt/cuehbot
WORKDIR /opt/cuehbot
RUN ["npm", "install"]
ENV DISCORD_TOKEN token
CMD ["npm", "run", "main"]