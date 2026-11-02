# ARTEMIS Chile Lite — GTK 4 + WebKitGTK 6. Desarrollada por Javiera Navarrete.
PKGS := gtk4 webkitgtk-6.0
UI_DIR ?= /usr/share/artemis-chile-lite/ui
CFLAGS := -O2 -Wall -Wextra -std=c11 $(shell pkg-config --cflags $(PKGS)) -DUI_DIR='"$(UI_DIR)"' $(EXTRA_CFLAGS)
LIBS := $(shell pkg-config --libs $(PKGS))
artemis-lite: artemis-lite.c
	$(CC) $(CFLAGS) -o $@ $< $(LIBS)
clean:
	rm -f artemis-lite
