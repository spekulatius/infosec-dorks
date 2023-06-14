# A Personal Collection of InfoSec Dorks

## Surface Discovery

### Config files

- `site:[TARGET] ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:env | ext:ini`

   This dork searches for configuration files on the specified target site. Configuration files often contain sensitive information such as database credentials, API keys, and server configurations.

### Database files

- `site:[TARGET] ext:sql | ext:db | ext:dbf | ext:mdb | ext:sql.gz | ext:sql.gz | ext:db.gz | ext:db.gz`

  This dork helps to find database files on the specified target site. Database files may contain valuable data and their exposure can lead to unauthorized access or data breaches.

### Backup files

- `site:[TARGET] ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup`

  This dork is useful for discovering backup files on the specified target site. Backup files are often created to store previous versions of files or data, but if they are exposed, they may contain sensitive or outdated information.

### .git folder

- `inurl:"/.git" [TARGET] -site:github.com`

### Exposed documents

- `site:[TARGET] ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv`

### SQL errors

- `site:[TARGET] AND (intext:"sql syntax near" | intext:"syntax error has occurred" | intext:"incorrect syntax near" | intext:"unexpected end of SQL command" | intext:"Warning: mysql_connect()" | intext:"Warning: mysql_query()" | intext:"Warning: pg_connect()")`

### PHP errors

- `site:[TARGET] AND ("PHP Parse error" | "PHP Warning" | "PHP Error")`
- `site:[TARGET] "Index of" inurl:phpmyadmin`

### Login pages

- `site:[TARGET] AND (inurl:signup | inurl:login | inurl:register | intitle:Signup)`

### Open redirects

- `site:[TARGET] AND (inurl:redir | inurl:url | inurl:redirect | inurl:return | inurl:location | inurl:next | inurl:dest | inurl:src=http | inurl:r=http)`

### Apache Struts RCE

- `site:[TARGET] AND (ext:action | ext:struts | ext:do)`

### Wordpress files

- `site:[TARGET] AND (inurl:wp-content | inurl:wp-includes)`
- `site:[TARGET] inurl:wp-config.php intext:DB_PASSWORD`
- `site:[TARGET] intitle:"Index of" wp-admin`

### Other files

- `site:[TARGET] AND (intitle:index.of | ext:log | ext:php intitle:phpinfo "published by the PHP Group" | inurl:shell | inurl:backdoor | inurl:wso | inurl:cmd | shadow | passwd | boot.ini | inurl:backdoor | inurl:readme | inurl:license | inurl:install | inurl:setup | inurl:config | inurl:"/phpinfo.php" | inurl:".htaccess" | ext:swf)`

- `site:[TARGET] AND (ext:env | ext:log | ext:sql | ext:yml | ext:pem | ext:ini | ext:logs | ext:ibd | ext:txt | ext:php.txt | ext:old | ext:key | ext:frm | ext:bak | ext:zip | ext:swp | ext:conf | ext:db | ext:config | ext:ovpn | ext:svn | ext:git | ext:cfg | ext:exs | ext:dbf | ext:mdb | ext:pem | ext:pub | ext:yaml | ext:zip | ext:asc | ext:xls | ext:xlsx")`


### Various Single Dorks

- `site:[TARGET] inurl:_cpanel/forgotpwd`
- `site:[TARGET] inurl:/proc/self/cwd`
- `site:[TARGET] inurl:/etc/`
- `site:[TARGET] filename:constants`
- `site:[TARGET] filename:settings`
- `site:[TARGET] filename:database`
- `site:[TARGET] filename:config`
- `site:[TARGET] filename:environment`
- `site:[TARGET] filename:spec`
- `site:[TARGET] filename:zhrc`
- `site:[TARGET] filename:bash`
- `site:[TARGET] filename:npmrc`
- `site:[TARGET] filename:dockercfg`
- `site:[TARGET] filename:pass`
- `site:[TARGET] filename:global`
- `site:[TARGET] filename:credentials`
- `site:[TARGET] filename:connections`
- `site:[TARGET] filename:s3cfg`
- `site:[TARGET] filename:wp-config`
- `site:[TARGET] filename:htpasswd`
- `site:[TARGET] filename:git-credentials`
- `site:[TARGET] filename:id_dsa`
- `site:[TARGET] filename:id_rsa`
- `site:[TARGET] extension:env`
- `site:[TARGET] extension:cfg`
- `site:[TARGET] extension:ini`
- `site:[TARGET] language:yaml -filename:travis`
- `site:[TARGET] extension:properties`
- `site:[TARGET] extension:bat`
- `site:[TARGET] extension:sh`
- `site:[TARGET] extension:zsh`
- `site:[TARGET] extension:pem`
- `site:[TARGET] extension:ppk`
- `site:[TARGET] extension:sql`
- `site:[TARGET] extension:json`
- `site:[TARGET] extension:xml`
- `site:[TARGET] filename:bash_history`
- `site:[TARGET] filename:bash_profile`
- `site:[TARGET] filename:bashrc`
- `site:[TARGET] filename:cshrc`
- `site:[TARGET] filename:history`
- `site:[TARGET] filename:netrc`
- `site:[TARGET] filename:pgpass`
- `site:[TARGET] filename:tugboat`
- `site:[TARGET] filename:dhcpd.conf`
- `site:[TARGET] filename:express.conf`
- `site:[TARGET] filename:filezilla.xml`
- `site:[TARGET] filename:idea14.key`
- `site:[TARGET] filename:makefile`
- `site:[TARGET] filename:gitconfig`
- `site:[TARGET] filename:prod.exs`
- `site:[TARGET] filename:prod.secret.exs`
- `site:[TARGET] filename:proftpdpasswd`
- `site:[TARGET] filename:recentservers.xml`
- `site:[TARGET] filename:robomongo.json`
- `site:[TARGET] filename:server.cfg`
- `site:[TARGET] filename:shadow`
- `site:[TARGET] filename:sshd_config`
- `site:[TARGET] filename:known_hosts`
- `site:[TARGET] filename:wp-config.php`
- `site:[TARGET] filename:.env`
- `site:[TARGET] filename:hub`
- `site:[TARGET] filename:.netrc`
- `site:[TARGET] filename:_netrc`
- `site:[TARGET] filename:ventrilo_srv.ini`
- `site:[TARGET] filename:dbeaver-data-sources.xml`
- `site:[TARGET] filename:sftp-config.json`
- `site:[TARGET] filename:.esmtprc password`
- `site:[TARGET] filename:.remote-sync.json`
- `site:[TARGET] filename:WebServers.xml`
- `site:[TARGET] staging`
- `site:[TARGET] stg`
- `site:[TARGET] prod`
- `site:[TARGET] preprod`
- `site:[TARGET] swagger`
- `site:[TARGET] internal`
- `site:[TARGET] dotfiles`
- `site:[TARGET] dot-files`
- `site:[TARGET] mydotfiles`
- `site:[TARGET] config`
- `site:[TARGET] dbpasswd`
- `site:[TARGET] db_password`
- `site:[TARGET] db_username`
- `site:[TARGET] dbuser`
- `site:[TARGET] testuser`
- `site:[TARGET] dbpassword`
- `site:[TARGET] keyPassword`
- `site:[TARGET] storePassword`
- `site:[TARGET] passwords`
- `site:[TARGET] password`
- `site:[TARGET] secret.password`
- `site:[TARGET] database_password`
- `site:[TARGET] sql_password`
- `site:[TARGET] passwd`
- `site:[TARGET] pass`
- `site:[TARGET] pwd`
- `site:[TARGET] pwds`
- `site:[TARGET] root_password`
- `site:[TARGET] credentials`
- `site:[TARGET] security_credentials`
- `site:[TARGET] connectionstring`
- `site:[TARGET] private -language:java`
- `site:[TARGET] private_key`
- `site:[TARGET] master_key`
- `site:[TARGET] token`
- `site:[TARGET] access_token`
- `site:[TARGET] auth_token`
- `site:[TARGET] oauth_token`
- `site:[TARGET] authorizationToken`
- `site:[TARGET] secret`
- `site:[TARGET] secrets`
- `site:[TARGET] secret_key`
- `site:[TARGET] secret_token`
- `site:[TARGET] api_secret`
- `site:[TARGET] app_secret`
- `site:[TARGET] appsecret`
- `site:[TARGET] client_secret`
- `site:[TARGET] key`
- `site:[TARGET] send_keys`
- `site:[TARGET] send.keys`
- `site:[TARGET] sendkeys`
- `site:[TARGET] apikey`
- `site:[TARGET] api_key`
- `site:[TARGET] app_key`
- `site:[TARGET] application_key`
- `site:[TARGET] appkey`
- `site:[TARGET] appkeysecret`
- `site:[TARGET] access_key`
- `site:[TARGET] apiSecret`
- `site:[TARGET] x-api-key`
- `site:[TARGET] apidocs`
- `site:[TARGET] secret_access_key`
- `site:[TARGET] encryption_key`
- `site:[TARGET] consumer_key`
- `site:[TARGET] auth`
- `site:[TARGET] secure`
- `site:[TARGET] login`
- `site:[TARGET] conn.login`
- `site:[TARGET] sshpass`
- `site:[TARGET] ssh2_auth_password`
- `site:[TARGET] irc_pass`
- `site:[TARGET] fb_secret`
- `site:[TARGET] sf_username`
- `site:[TARGET] node_env`
- `site:[TARGET] aws_key`
- `site:[TARGET] aws_token`
- `site:[TARGET] aws_secret`
- `site:[TARGET] aws_access`
- `site:[TARGET] AWSSecretKey`
- `site:[TARGET] github_key`
- `site:[TARGET] github_token`
- `site:[TARGET] gh_token`
- `site:[TARGET] slack_api`
- `site:[TARGET] slack_token`
- `site:[TARGET] bucket_password`
- `site:[TARGET] redis_password`
- `site:[TARGET] ldap_username`
- `site:[TARGET] ldap_password`
- `site:[TARGET] gmail_username`
- `site:[TARGET] gmail_password`
- `site:[TARGET] codecov_token`
- `site:[TARGET] fabricApiSecret`
- `site:[TARGET] mailgun`
- `site:[TARGET] mailchimp`
- `site:[TARGET] appspot`
- `site:[TARGET] firebase`
- `site:[TARGET] gitlab`
- `site:[TARGET] stripe`
- `site:[TARGET] herokuapp`
- `site:[TARGET] cloudfront`
- `site:[TARGET] amazonaws`
- `site:[TARGET] npmrc _auth`
- `site:[TARGET] pem private`
- `site:[TARGET] aws_access_key_id`
- `site:[TARGET] bashrc password`
- `site:[TARGET] xoxp OR xoxb OR xoxa`
- `site:[TARGET] FTP`
- `site:[TARGET] s3.yml`
- `site:[TARGET] .exs`
- `site:[TARGET] beanstalkd.yml`
- `site:[TARGET] deploy.rake`
- `site:[TARGET] mysql`
- `site:[TARGET] .bash_history`
- `site:[TARGET] .sls`
- `site:[TARGET] composer.jsonfilename:.npmrc _auth`
- `site:[TARGET] filename:.dockercfg auth`
- `site:[TARGET] extension:pem private`
- `site:[TARGET] extension:ppk private`
- `site:[TARGET] filename:id_rsa or filename:id_dsa`
- `site:[TARGET] extension:sql mysql dump`
- `site:[TARGET] extension:sql mysql dump password`
- `site:[TARGET] filename:credentials aws_access_key_id`
- `site:[TARGET] filename:.s3cfg`
- `site:[TARGET] filename:.htpasswd`
- `site:[TARGET] filename:.env DB_USERNAME NOT homestead`
- `site:[TARGET] filename:.env MAIL_HOST=smtp.gmail.com`
- `site:[TARGET] filename:.git-credentials`
- `site:[TARGET] PT_TOKEN language:bash`
- `site:[TARGET] filename:.bashrc password`
- `site:[TARGET] filename:.bashrc mailchimp`
- `site:[TARGET] filename:.bash_profile aws`
- `site:[TARGET] rds.amazonaws.com password`
- `site:[TARGET] extension:json api.forecast.io`
- `site:[TARGET] extension:json mongolab.com`
- `site:[TARGET] extension:yaml mongolab.com`
- `site:[TARGET] jsforce extension:js conn.login`
- `site:[TARGET] SF_USERNAME salesforce`
- `site:[TARGET] filename:.tugboat NOT _tugboat`
- `site:[TARGET] HEROKU_API_KEY language:shell`
- `site:[TARGET] HEROKU_API_KEY language:json`
- `site:[TARGET] filename:.netrc password`
- `site:[TARGET] filename:_netrc password`
- `site:[TARGET] filename:hub oauth_token`
- `site:[TARGET] filename:filezilla.xml Pass`
- `site:[TARGET] filename:recentservers.xml Pass`
- `site:[TARGET] filename:config.json auths`
- `site:[TARGET] filename:config irc_pass`
- `site:[TARGET] filename:connections.xml`
- `site:[TARGET] filename:express.conf path:.openshift`
- `site:[TARGET] filename:.pgpass`
- `site:[TARGET] [WFClient] Password= extension:ica`
- `site:[TARGET] filename:server.cfg rcon password`
- `site:[TARGET] JEKYLL_GITHUB_TOKEN`
- `site:[TARGET] filename:.bash_history`
- `site:[TARGET] filename:.cshrc`
- `site:[TARGET] filename:.history`
- `site:[TARGET] filename:.sh_history`
- `site:[TARGET] filename:prod.exs NOT prod.secret.exs`
- `site:[TARGET] filename:configuration.php JConfig password`
- `site:[TARGET] filename:config.php dbpasswd`
- `site:[TARGET] filename:config.php pass`
- `site:[TARGET] path:sites databases password`
- `site:[TARGET] shodan_api_key language:python`
- `site:[TARGET] shodan_api_key language:shell`
- `site:[TARGET] shodan_api_key language:json`
- `site:[TARGET] shodan_api_key language:ruby`
- `site:[TARGET] filename:shadow path:etc`
- `site:[TARGET] filename:passwd path:etc`
- `site:[TARGET] extension:avastlic "support.avast.com"`
- `site:[TARGET] extension:json googleusercontent client_secret`
- `site:[TARGET] HOMEBREW_GITHUB_API_TOKEN language:shell`
- `site:[TARGET] xoxp OR xoxb`
- `site:[TARGET] .mlab.com password`
- `site:[TARGET] filename:logins.json`
- `site:[TARGET] filename:CCCam.cfg`
- `site:[TARGET] msg nickserv identify filename:config`
- `site:[TARGET] filename:settings.py SECRET_KEY`
- `site:[TARGET] filename:secrets.yml password`
- `site:[TARGET] filename:master.key path:config`
- `site:[TARGET] filename:deployment-config.json`
- `site:[TARGET] filename:.ftpconfig`
- `site:[TARGET] filename:sftp.json path:.vscode`
- `site:[TARGET] filename:jupyter_notebook_config.json`
- `site:[TARGET] "api_hash" "api_id"`
- `site:[TARGET] "https://hooks.slack.com/services/"`
- `site:[TARGET] filename:github-recovery-codes.txt`
- `site:[TARGET] filename:gitlab-recovery-codes.txt`
- `site:[TARGET] filename:discord_backup_codes.txt`
- `site:[TARGET] extension:yaml cloud.redislabs.com`
- `site:[TARGET] extension:json cloud.redislabs.com`
- `site:[TARGET] stage`
- `site:[TARGET] _key`
- `site:[TARGET] _token`
- `site:[TARGET] _secret`
- `site:[TARGET] TODO`
- `site:[TARGET] signup`
- `site:[TARGET] register`
- `site:[TARGET] admin`
- `site:[TARGET] administrator`
- `site:[TARGET] testing`
- `site:[TARGET] extension:exs`
- `site:[TARGET] extension:sls`
- `site:[TARGET] filename:beanstalkd.yml`
- `site:[TARGET] filename:deploy.rake`
- `site:[TARGET] filename:composer.json`
- `site:[TARGET] filename:composer.lock`
- `site:[TARGET] ftp`
- `site:[TARGET] ssh`

## Services

### Credentials in Trello

- `inurl:trello.com AND intext:[TARGET]`

If there are numerous results, narrow it further down with:

- `inurl:trello.com AND intext:username AND intext:[TARGET]`
- `inurl:trello.com AND intext:password AND intext:[TARGET]`
- `inurl:trello.com AND intext:apikey AND intext:[TARGET]`

### Zoom

- `inurl:http://zoom.us/j  [TARGET]`
- `inurl:http://zoom.us/j intext:password [TARGET]`
- `inurl:http://zoom.us/j intext:id# [TARGET]`

### Ciphermail Login

- `site:*.target.com intext:"CipherMail Email Encryption Gateway login"`

### Various Services

- `site:sharepoint.com [TARGET]`
- `site:box.com/s [TARGET]`
- `site:dropbox.com/s [TARGET]`
- `site:onedrive.live.com [TARGET]`
- `site:docs.google.com inurl:"/d/" [TARGET]`
- `site:[TARGET] inurl:Dashboard.jspa intext:"Atlassian Jira Project Management Software"`

### Linkedin employees

- `site:linkedin.com employees [TARGET]`

## Cloud Services & Online Dev Tools

### AWS S3 Buckets

- `intext:[TARGET] AND (site:"s3-external-1.amazonaws.com" | site:"s3.amazonaws.com")`

Make sure to check the various regions:

- `intext:[TARGET] AND (site:s3.af-south-1.amazonaws.com | site:s3.ap-east-1.amazonaws.com | site:s3.ap-northeast-1.amazonaws.com | site:s3.ap-northeast-2.amazonaws.com | site:s3.ap-northeast-3.amazonaws.com | site:s3.ap-south-1.amazonaws.com | site:s3.ap-south-2.amazonaws.com | site:s3.ap-southeast-1.amazonaws.com | site:s3.ap-southeast-2.amazonaws.com | site:s3.ap-southeast-3.amazonaws.com | site:s3.ap-southeast-4.amazonaws.com | site:s3.ca-central-1.amazonaws.com | site:s3.eu-central-1.amazonaws.com | site:s3.eu-central-2.amazonaws.com | site:s3.eu-north-1.amazonaws.com | site:s3.eu-south-1.amazonaws.com | site:s3.eu-south-2.amazonaws.com | site:s3.eu-west-1.amazonaws.com | site:s3.eu-west-2.amazonaws.com | site:s3.eu-west-3.amazonaws.com | site:s3.me-central-1.amazonaws.com | site:s3.me-south-1.amazonaws.com | site:s3.sa-east-1.amazonaws.com | site:s3.us-east-1.amazonaws.com | site:s3.us-east-2.amazonaws.com | site:s3.us-gov-east-1.amazonaws.com | site:s3.us-gov-west-1.amazonaws.com | site:s3.us-west-1.amazonaws.com | site:s3.us-west-2.amazonaws.com)`
- `intext:[TARGET] AND (site:s3.dualstack.af-south-1.amazonaws.com | site:s3.dualstack.ap-east-1.amazonaws.com | site:s3.dualstack.ap-northeast-1.amazonaws.com | site:s3.dualstack.ap-northeast-2.amazonaws.com | site:s3.dualstack.ap-northeast-3.amazonaws.com | site:s3.dualstack.ap-south-1.amazonaws.com | site:s3.dualstack.ap-south-2.amazonaws.com | site:s3.dualstack.ap-southeast-1.amazonaws.com | site:s3.dualstack.ap-southeast-2.amazonaws.com | site:s3.dualstack.ap-southeast-3.amazonaws.com | site:s3.dualstack.ap-southeast-4.amazonaws.com | site:s3.dualstack.ca-central-1.amazonaws.com | site:s3.dualstack.eu-central-1.amazonaws.com | site:s3.dualstack.eu-central-2.amazonaws.com | site:s3.dualstack.eu-north-1.amazonaws.com | site:s3.dualstack.eu-south-1.amazonaws.com | site:s3.dualstack.eu-south-2.amazonaws.com | site:s3.dualstack.eu-west-1.amazonaws.com | site:s3.dualstack.eu-west-2.amazonaws.com | site:s3.dualstack.eu-west-3.amazonaws.com | site:s3.dualstack.me-central-1.amazonaws.com | site:s3.dualstack.me-south-1.amazonaws.com | site:s3.dualstack.sa-east-1.amazonaws.com | site:s3.dualstack.us-east-1.amazonaws.com | site:s3.dualstack.us-east-2.amazonaws.com | site:s3.dualstack.us-gov-east-1.amazonaws.com | site:s3.dualstack.us-gov-west-1.amazonaws.com | site:s3.dualstack.us-west-1.amazonaws.com | site:s3.dualstack.us-west-2.amazonaws.com)`

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
- `intitle:"Dashboard [Jenkins]" [TARGET]`
- `(site:bitpaste.app | site:codebeautify.org | site:codepad.co | site:codepad.co |site:ideone.com | site:codepad.org | site:codepen.io | site:codeshare.io | site:coggle.it | site:controlc.com | site:dotnetfiddle.net | site:dpaste.com | site:dpaste.org | site:gitter.im | site:hastebin.com | site:heypasteit.com | site:ide.geeksforgeeks.org | site:ideone.com | site:jsdelivr.com | site:jsdelivr.net | site:jsfiddle.net) AND "[TARGET]"`
- `(site:justpaste.it | site:libraries.io | site:npmjs.com | site:npm.runit.com | site:npm.runkit.com | site:papaly.com | site:paste2.org | site:pastebin.com | site:paste.debian.net | site:pastehtml.com | site:paste.org | site:phpfiddle.org | site:prezi.com | site:productforums.google.com | site:repl.it | site:replt.it | site:scribd.com | site:sharecode.io | site:snipplr.com | site:trello.com | site:ycombinator.com) AND "[TARGET]"`
