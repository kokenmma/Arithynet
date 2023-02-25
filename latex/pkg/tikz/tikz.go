package tikz

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

type Tikz struct {
	preamble  string
	index     string
	postamble string
	dirname   string
	svg       string
}

func NewTikz(index string) *Tikz {
	return &Tikz{
		preamble: `\documentclass[xelatex,ja=standard]{bxjsarticle}
% -------- maths ---------
\usepackage{amsmath, amssymb}
\usepackage{bm}
\usepackage{bbm}
\usepackage{mathtools}
\usepackage{physics}

% -------- images ---------
\usepackage{graphicx}
\usepackage[dvipsnames,table]{xcolor}
\usepackage{float}
\usepackage{pgf}
\usepackage{tikz}
\usetikzlibrary{arrows,automata}
\pgfrealjobname{filename}

\begin{document}
\beginpgfgraphicnamed{texput}
\resizebox{25cm}{!}{
`,
		index: index,
		postamble: `
}
\endpgfgraphicnamed
\end{document}`,
	}
}

func (t *Tikz) MakeDir() (*Tikz, error) {
	dir, err := os.MkdirTemp("", "tikz")
	if err != nil {
		return nil, fmt.Errorf("error MakeDir err: %v", err)
	}
	t.dirname = dir
	return t, nil
}

func (t *Tikz) Compile() ([]byte, error) {
	cmd := exec.Command("tectonic", "-X", "compile", "-o", t.dirname, "-")
	cmd.Stdin = strings.NewReader(t.preamble + t.index + t.postamble)
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("error compile code: %v\n%s", err, stdoutStderr)
	}

	cmd = exec.Command("pdftocairo", "-png", t.dirname+"/texput.pdf", t.dirname+"/texput")
	stdoutStderr, err = cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("error pdf2png: %v\n%s", err, stdoutStderr)
	}

	f, err := ioutil.ReadFile(t.dirname + "/texput-1.png")
	if err != nil {
		return nil, fmt.Errorf("error read png: %v", err)
	}
	return f, nil
}

func (t *Tikz) RmoveDir() error {
	err := os.RemoveAll(t.dirname)
	if err != nil {
		return fmt.Errorf("error MakeDir err: %v", err)
	}
	return nil
}

func TikzWrapper(index string) ([]byte, error) {
	res, err := NewTikz(index).MakeDir()
	if err != nil {
		return nil, err
	}
	defer func() {
		if err := res.RmoveDir(); err != nil {
			log.Println(err)
		}
	}()

	return res.Compile()
}
