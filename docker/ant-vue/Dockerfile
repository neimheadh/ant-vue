ARG FROM_IMAGE=node:latest
FROM ${FROM_IMAGE}

# Create development user
ARG GID=1000
ARG UID=1000
ARG USERNAME=developer
RUN (id -ng "${GID}" > /dev/null || groupadd --gid "${GID}" "${USERNAME}") &&\
    ((id -nu "${UID}" > /dev/null && usermod -a -G $(id -ng "${GID}") $(id -nu "${UID}")) || useradd --uid "${UID}" --gid "${GID}" "${USERNAME}")
USER "${UID}"

# Configure development env.
EXPOSE 3000
WORKDIR "/app"
CMD ["yarn", "dev"]