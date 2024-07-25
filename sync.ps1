$from = "moodle-atto_autolink/src/*"
$to = "shared/recitfad3/lib/editor/atto/plugins/recitautolink"

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}