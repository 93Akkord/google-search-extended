# Get current TIMESTAMP
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Extract version from package.json
VERSION=$(jq -r .version package.json)

# Add all changes to the git index
git add .

# Commit the changes
git commit -m "$TIMESTAMP"

# Tag the current commit with the version
git tag -f "v$VERSION"

# Push the repo to the remote repository
git push origin master

# Push the tag to the remote repository
git push origin "v$VERSION"
