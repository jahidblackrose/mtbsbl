# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["SBL_Solution.sln", "./"]
COPY ["SBL.Web/SBL.Web.csproj", "SBL.Web/"]

# Restore dependencies
RUN dotnet restore

# Copy the rest of the code
COPY . .
WORKDIR "/src/SBL.Web"

# Build and publish
RUN dotnet build "SBL.Web.csproj" -c Release -o /app/build
RUN dotnet publish "SBL.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Security: Run as non-root user
USER $APP_UID

# Expose ports
EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "SBL.Web.dll"]
