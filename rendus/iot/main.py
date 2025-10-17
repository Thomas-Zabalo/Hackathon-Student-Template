from machine import Pin, PWM, time_pulse_us
import time
import urequests

# === CONFIGURATION ===
TRIG1, ECHO1 = 4, 18
TRIG2, ECHO2 = 17, 16
BUZZER1, BUZZER2 = 25, 26
API_URL = "http://192.168.1.100/api/goals"

vitesseSeuil = 100.0
delai_mesure = 0.05

# === INITIALISATION ===
trig1 = Pin(TRIG1, Pin.OUT)
echo1 = Pin(ECHO1, Pin.IN)
trig2 = Pin(TRIG2, Pin.OUT)
echo2 = Pin(ECHO2, Pin.IN)
buzzer1 = PWM(Pin(BUZZER1))
buzzer2 = PWM(Pin(BUZZER2))

# === TABLE DE NOTES ===
notes = {
    "E7": 2637, "C7": 2093, "G7": 3136, "G6": 1568,
    "E4": 330, "G4": 392, "A4": 440, "B4": 494,
    "C5": 523, "D5": 587, "E5": 659, "F5": 698,
    "G5": 784, "A5": 880, "B5": 988
}

# === MÉLODIE MARIO ABRÉGÉE ===
mario_melody = [
    ("E7", 0.1), ("E7", 0.1), (0, 0.1), ("E7", 0.1),
    (0, 0.1), ("C7", 0.1), ("E7", 0.1), (0, 0.1), ("G7", 0.1),
    (0, 0.3), ("G6", 0.1)
]


def play_tone(buzzer: PWM, note: str | int, duration: float) -> None:
    """Joue une note donnée sur un buzzer pendant un certain temps."""
    if note == 0:
        buzzer.duty(0)
    else:
        buzzer.freq(notes[note])
        buzzer.duty(512)
    time.sleep(duration)
    buzzer.duty(0)
    time.sleep(0.02)


def mario_theme(buzzer: PWM) -> None:
    """Joue la mélodie Mario sur le buzzer."""
    for note, duration in mario_melody:
        play_tone(buzzer, note, duration)


def get_distance(trig: Pin, echo: Pin) -> float:
    """Retourne la distance mesurée par le capteur ultrason (en cm)."""
    trig.off()
    time.sleep_us(2)
    trig.on()
    time.sleep_us(10)
    trig.off()
    try:
        duree = time_pulse_us(echo, 1, 30000)
        return duree * 0.0343 / 2
    except OSError:
        return 999.0


def calc_vitesse(d1: float, d2: float, dt: float) -> float:
    """Calcule la vitesse du déplacement (en cm/s)."""
    return abs(d1 - d2) / dt


def send_goal(vitesse: float, team_id: int) -> None:
    """Envoie une requête POST à l'API pour signaler un but."""
    try:
        payload = {"vitesse": vitesse, "team": team_id}
        print("📡 POST:", payload)
        res = urequests.post(API_URL, json=payload)
        print("✅ Réponse:", res.status_code)
        res.close()
    except Exception as e:
        print("❌ Erreur POST:", e)


def check_goal(trig: Pin, echo: Pin, buzzer: PWM, team_id: int) -> None:
    """Détecte un but pour une équipe donnée et déclenche le son + POST."""
    d1 = get_distance(trig, echo)
    time.sleep(delai_mesure)
    d2 = get_distance(trig, echo)
    vitesse = calc_vitesse(d1, d2, delai_mesure)

    if vitesse > vitesseSeuil and vitesse < 1000:
        print(f"⚽ But détecté - Team {team_id} | Vitesse: {vitesse:.2f} cm/s")
        send_goal(round(vitesse, 2), team_id)
        mario_theme(buzzer)


def main() -> None:
    """Boucle principale du système de détection de buts."""
    print("✅ Système Babyfoot connecté et prêt !")
    while True:
        check_goal(trig1, echo1, buzzer1, 1)
        check_goal(trig2, echo2, buzzer2, 2)
        time.sleep(0.1)


if __name__ == "__main__":
    main()
