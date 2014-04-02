"""Setup for sqli XBlock."""

import os
from setuptools import setup


def package_data(pkg, root):
    """Generic function to find package_data for `pkg` under `root`."""
    data = []
    for dirname, _, files in os.walk(os.path.join(pkg, root)):
        for fname in files:
            data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='sqli-xblock',
    version='0.11',
    description='sqli XBlock',   # TODO: write a better description.
    packages=[
        'sqli',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'sqli = sqli:SqlInjectionXBlock',
        ]
    },
    package_data=package_data("sqli", "static"),
)