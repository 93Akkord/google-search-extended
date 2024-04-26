# Get current TIMESTAMP
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Add all changes to the git index
git add .

# Commit the changes
git commit -m "$TIMESTAMP"

# Push the repo to the remote repository
git push origin master
