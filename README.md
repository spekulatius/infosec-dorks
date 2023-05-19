# A Personal collection of Infosec Dorks

Append your `intext:target` or `site:*.target.com` as needed.

## Services

### Surface Discovery

- `site:*.target.com intitle:login`

### Credentials in Trello

- `inurl:trello.com AND intext:[TARGET]`

If there are numerous results, narrow it further down with:

- `inurl:trello.com AND intext:username AND intext:[TARGET]`
- `inurl:trello.com AND intext:password AND intext:[TARGET]`
- `inurl:trello.com AND intext:apikey AND intext:[TARGET]`

### Ciphermail Login

- `site:*.target.com intext:"CipherMail Email Encryption Gateway login"`

### Various Services

- `site:sharepoint.com [TARGET]`
- `site:box.com/s [TARGET]`
- `site:dropbox.com/s [TARGET]`
- `site:onedrive.live.com [TARGET]`
- `site:docs.google.com inurl:"/d/" [TARGET]`


## Cloud Services & Online Dev Tools

### Confidential Files stored in AWS

- `site:"s3-external-1.amazonaws.com" AND intext:CONFIDENTIAL`
- `site:"s3.amazonaws.com" AND intext:CONFIDENTIAL`
- `site:"s3.dualstack.us-east-1.amazonaws.com" AND intext:CONFIDENTIAL`

Make sure to check the various regions.

### Digitalocean Spaces

- `site:digitaloceanspaces.com [TARGET]`

### Confidential Files stored in Azure

- `site:"blob.core.windows.net" AND intext:"CONFIDENTIAL"`

### Secrets in Microsoft Devops

- `site:"dev.azure.com" AND intext:secret`
- `site:"dev.azure.com" AND intext:password`
- `site:"dev.azure.com" AND intext:apikey`

GitHub, GitLab, BB online dev enviroments?

### Various Services

- `site:jfrog.io` - Build artifacts, etc.
