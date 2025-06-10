import pandas as pd

# Läs in data från data.csv och parts.csv
data_df = pd.read_csv("data.csv")
parts_df = pd.read_csv("parts.csv")

# Skapa en dictionary för att mappa ID till namn
id_to_name = dict(zip(parts_df.iloc[:, 0], parts_df.iloc[:, 1]))

# Ersätt första kolumnens värde med motsvarande namn
updated_data = data_df.copy()
updated_data.iloc[:, 0] = updated_data.iloc[:, 0].map(id_to_name)
updated_data.columns = ["name", "color", "count", "is_spare", "image"]

# Spara resultatet till out.json
updated_data.head(100).to_json("out.json", orient="records", lines=False)

# Lägg till "parts" som nyckel i JSON-filen
# with open("out.json", "r", encoding="utf-8") as json_file:
#     json_data = json_file.read()

# json_data = f'{{"parts": {json_data}}}'

# with open("out.json", "w", encoding="utf-8") as json_file:
#     json_file.write(json_data)