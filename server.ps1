$l = [System.Net.HttpListener]::new()
$l.Prefixes.Add('http://localhost:8080/')
$l.Start()
Write-Host 'Server running at http://localhost:8080'
Write-Host 'Press Ctrl+C to stop'

try {
    while ($l.IsListening) {
        $c = $l.GetContext()
        $path = $c.Request.Url.LocalPath
        $f = Join-Path 'C:\Users\Administrator\Desktop\My Websites\golfcart-usa' $path.TrimStart('/')
        if (-not (Test-Path $f) -or (Test-Path $f -PathType Leaf)) {
            $f = 'C:\Users\Administrator\Desktop\My Websites\golfcart-usa\index.html'
        }
        if (Test-Path $f) {
            $b = [System.IO.File]::ReadAllBytes($f)
            $ext = [System.IO.Path]::GetExtension($f)
            $ct = 'text/html'
            switch ($ext) { '.css' { $ct = 'text/css' } '.js' { $ct = 'application/javascript' } }
            $c.Response.ContentType = $ct
            $c.Response.ContentLength64 = $b.Length
            $c.Response.OutputStream.Write($b, 0, $b.Length)
        } else {
            $c.Response.StatusCode = 404
            $c.Response.Close()
        }
        $c.Response.Close()
    }
} finally {
    $l.Stop()
    $l.Close()
}