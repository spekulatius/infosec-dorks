# A Personal collection of Infosec Dorks

Append your `intext:target` or `site:*.target.com` as needed.

## Surface Discovery

- `site:*.target.com intitle:login`
- `site:*.target.com intitle:password`
- `site:*.target.com intitle:register`


### Config files

- `site:[TARGET] ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:env | ext:ini`

### Database files

- `site:[TARGET] ext:sql | ext:db | ext:dbf | ext:mdb | ext:sql.gz | ext:sql.gz | ext:db.gz | ext:db.gz`

### Backup files

- `site:[TARGET] ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup`

### .git folder

- `inurl:\"/.git\" [TARGET] -site:github.com`

### Exposed documents

- `site:[TARGET] ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv`

### Other files

- `site:[TARGET] AND (intitle:index.of | ext:log | ext:php intitle:phpinfo \"published by the PHP Group\" | inurl:shell | inurl:backdoor | inurl:wso | inurl:cmd | shadow | passwd | boot.ini | inurl:backdoor | inurl:readme | inurl:license | inurl:install | inurl:setup | inurl:config | inurl:\"/phpinfo.php\" | inurl:\".htaccess\" | ext:swf)`

- `site:[TARGET] AND (ext:env | ext:log | ext:sql | ext:yml | ext:pem | ext:ini | ext:logs | ext:ibd | ext:txt | ext:php.txt | ext:old | ext:key | ext:frm | ext:bak | ext:zip | ext:swp | ext:conf | ext:db | ext:config | ext:ovpn | ext:svn | ext:git | ext:cfg | ext:exs | ext:dbf | ext:mdb | ext:pem | ext:pub | ext:yaml | ext:zip | ext:asc | ext:xls | ext:xlsx")`

### SQL errors

- `site:[TARGET] AND (intext:\"sql syntax near\" | intext:\"syntax error has occurred\" | intext:\"incorrect syntax near\" | intext:\"unexpected end of SQL command\" | intext:\"Warning: mysql_connect()\" | intext:\"Warning: mysql_query()\" | intext:\"Warning: pg_connect()\")`

### PHP errors

- `site:[TARGET] AND (\"PHP Parse error\" | \"PHP Warning\" | \"PHP Error\")`

### Login pages

- `site:[TARGET] AND (inurl:signup | inurl:login | inurl:register | intitle:Signup)`

### Open redirects

- `site:[TARGET] AND (inurl:redir | inurl:url | inurl:redirect | inurl:return | inurl:src=http | inurl:r=http)`

### Apache Struts RCE

- `site:[TARGET] AND (ext:action | ext:struts | ext:do)`

### Wordpress files

- `site:[TARGET] AND (inurl:wp-content | inurl:wp-includes)`

## Services

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

# Linkedin employees

- `site:linkedin.com employees [TARGET]`

## Cloud Services & Online Dev Tools

### AWS

- `site:"s3-external-1.amazonaws.com" AND intext:CONFIDENTIAL`
- `site:"s3.amazonaws.com" AND intext:CONFIDENTIAL`
- `site:"s3.dualstack.us-east-1.amazonaws.com" AND intext:CONFIDENTIAL`

Make sure to check the various regions.

### Azure

- `site:"blob.core.windows.net" AND intext:[TARGET]`

### Google Cloud

- `site:"storage.googleapis.com" AND intext:[TARGET]`

### Digitalocean Spaces

- `site:"digitaloceanspaces.com" [TARGET]`

### Git Providers

- `site:github.com | site:gitlab.com | site:bitbucket.org [TARGET]`

### Secrets in Microsoft Devops

- `site:"dev.azure.com" AND intext:secret`
- `site:"dev.azure.com" AND intext:password`
- `site:"dev.azure.com" AND intext:apikey`

GitHub, GitLab, BB online dev enviroments?

### Various Services

- `site:stackoverflow.com AND intext:"[TARGET]"`
- `site:jfrog.io AND intext:"[TARGET]"`
- ` [TARGET]`
- `intitle:traefik inurl:8080/dashboard [TARGET]`
- `intitle:\"Dashboard [Jenkins]\" [TARGET]`
- `(site:bitpaste.app | site:codebeautify.org | site:codepad.co | site:codepad.co |site:ideone.com | site:codepad.org | site:codepen.io | site:codeshare.io | site:coggle.it | site:controlc.com | site:dotnetfiddle.net | site:dpaste.com | site:dpaste.org | site:gitter.im | site:hastebin.com | site:heypasteit.com | site:ide.geeksforgeeks.org | site:ideone.com | site:jsdelivr.com | site:jsdelivr.net | site:jsfiddle.net) AND "[TARGET]"`
- `(site:justpaste.it | site:libraries.io | site:npmjs.com | site:npm.runit.com | site:npm.runkit.com | site:papaly.com | site:paste2.org | site:pastebin.com | site:paste.debian.net | site:pastehtml.com | site:paste.org | site:phpfiddle.org | site:prezi.com | site:productforums.google.com | site:repl.it | site:replt.it | site:scribd.com | site:sharecode.io | site:snipplr.com | site:trello.com | site:ycombinator.com) AND "[TARGET]"`