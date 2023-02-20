package tikz

import (
	"io/ioutil"
	"log"
	"os/exec"
)

func Compile(txt string) {
	err := ioutil.WriteFile("./src/index.tex", []byte(txt), 0644)
	if err != nil {
		log.Fatal(err)
	}

	cmd := exec.Command("tectonic", "-X", "build")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func pdf2svg() {
	cmd := exec.Command("pdftocairo", "-svg", "./build/default/default.pdf")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func xdv2svg() {
	cmd := exec.Command("dvisvgm", "texput.dvi")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func TikzWrapper(txt string) string {
	Compile(txt)
	pdf2svg()
	//xdv2svg()

	f, err := ioutil.ReadFile("default.svg")
	if err != nil {
		log.Fatal(err)
	}
	return string(f)
}
