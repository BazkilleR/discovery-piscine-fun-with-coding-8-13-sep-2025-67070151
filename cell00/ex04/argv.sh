#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
elif [ $# -gt 3 ]; then
    echo "maximum 3 arguments"
else
    for arg in "$@"
    do
        echo "$arg"
    done
fi
