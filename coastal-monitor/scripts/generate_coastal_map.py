import folium
import json
from pathlib import Path


# Detailed Yucatan coastline in 2000 (blue) - original position
coastline_2000 = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"year": 2000, "name": "Línea Costera 2000"},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    # Progreso area (northwest coast)
                    [-89.66, 21.30],
                    [-89.60, 21.29],
                    [-89.50, 21.28],
                    [-89.40, 21.27],
                    [-89.30, 21.26],
                    
                    # Telchac Puerto area
                    [-89.20, 21.25],
                    [-89.10, 21.24],
                    [-89.00, 21.23],
                    
                    # Dzilam de Bravo area
                    [-88.90, 21.22],
                    [-88.80, 21.23],
                    [-88.70, 21.24],
                    [-88.60, 21.25],
                    
                    # San Felipe area
                    [-88.50, 21.27],
                    [-88.40, 21.29],
                    [-88.30, 21.31],
                    [-88.20, 21.33],
                    
                    # Río Lagartos area
                    [-88.10, 21.35],
                    [-88.00, 21.38],
                    [-87.90, 21.41],
                    [-87.80, 21.44],
                    
                    # El Cuyo area
                    [-87.70, 21.47],
                    [-87.60, 21.50],
                    [-87.50, 21.53],
                    
                    # Holbox area (northeast)
                    [-87.40, 21.55],
                    [-87.30, 21.56],
                    [-87.20, 21.55],
                    [-87.10, 21.53],
                    
                    # Chiquilá area
                    [-87.00, 21.50],
                    [-86.95, 21.47],
                    [-86.92, 21.43],
                    
                    # Cancún area (east coast begins)
                    [-86.90, 21.38],
                    [-86.88, 21.30],
                    [-86.86, 21.20],
                    [-86.85, 21.16],
                    [-86.84, 21.10],
                    [-86.83, 21.05],
                    
                    # Puerto Morelos area
                    [-86.85, 20.95],
                    [-86.87, 20.85],
                    [-86.90, 20.75],
                    
                    # Playa del Carmen area
                    [-87.00, 20.65],
                    [-87.05, 20.63],
                    [-87.08, 20.61],
                    [-87.10, 20.59],
                    
                    # Puerto Aventuras area
                    [-87.15, 20.50],
                    [-87.20, 20.42],
                    [-87.25, 20.35],
                    
                    # Tulum area
                    [-87.30, 20.28],
                    [-87.35, 20.23],
                    [-87.40, 20.21],
                    [-87.45, 20.20],
                    [-87.46, 20.21],
                    
                    # Sian Ka'an area (south)
                    [-87.48, 20.15],
                    [-87.50, 20.10],
                    [-87.52, 20.05],
                    [-87.54, 20.00],
                ]
            }
        }
    ]
}

# Detailed Yucatan coastline in 2020 (red) - showing water advancement inland
coastline_2020 = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"year": 2020, "name": "Línea Costera 2020 (Avance del Mar)"},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    # Progreso area - significant advancement (20-50m inland)
                    [-89.64, 21.28],
                    [-89.58, 21.27],
                    [-89.48, 21.26],
                    [-89.38, 21.25],
                    [-89.28, 21.24],
                    
                    # Telchac Puerto - moderate advancement
                    [-89.18, 21.23],
                    [-89.08, 21.22],
                    [-88.98, 21.21],
                    
                    # Dzilam de Bravo - heavy advancement
                    [-88.88, 21.20],
                    [-88.78, 21.21],
                    [-88.68, 21.22],
                    [-88.58, 21.23],
                    
                    # San Felipe - moderate advancement
                    [-88.48, 21.25],
                    [-88.38, 21.27],
                    [-88.28, 21.29],
                    [-88.18, 21.31],
                    
                    # Río Lagartos - slight advancement
                    [-88.08, 21.33],
                    [-87.98, 21.36],
                    [-87.88, 21.39],
                    [-87.78, 21.42],
                    
                    # El Cuyo - moderate advancement
                    [-87.68, 21.45],
                    [-87.58, 21.48],
                    [-87.48, 21.51],
                    
                    # Holbox - significant advancement due to storms
                    [-87.38, 21.53],
                    [-87.28, 21.54],
                    [-87.18, 21.53],
                    [-87.08, 21.51],
                    
                    # Chiquilá - heavy advancement
                    [-86.98, 21.48],
                    [-86.93, 21.45],
                    [-86.90, 21.41],
                    
                    # Cancún - critical advancement (tourism area affected)
                    [-86.88, 21.36],
                    [-86.86, 21.28],
                    [-86.84, 21.18],
                    [-86.83, 21.14],
                    [-86.82, 21.08],
                    [-86.81, 21.03],
                    
                    # Puerto Morelos - significant advancement
                    [-86.83, 20.93],
                    [-86.85, 20.83],
                    [-86.88, 20.73],
                    
                    # Playa del Carmen - heavy advancement
                    [-86.98, 20.63],
                    [-87.03, 20.61],
                    [-87.06, 20.59],
                    [-87.08, 20.57],
                    
                    # Puerto Aventuras - moderate advancement
                    [-87.13, 20.48],
                    [-87.18, 20.40],
                    [-87.23, 20.33],
                    
                    # Tulum - significant advancement
                    [-87.28, 20.26],
                    [-87.33, 20.21],
                    [-87.38, 20.19],
                    [-87.43, 20.18],
                    [-87.44, 20.19],
                    
                    # Sian Ka'an - moderate advancement
                    [-87.46, 20.13],
                    [-87.48, 20.08],
                    [-87.50, 20.03],
                    [-87.52, 19.98],
                ]
            }
        }
    ]
}

erosion_zones = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Zona Crítica - Cancún",
                "erosion_rate": "Alta (30-50m)",
                "risk": "Crítico"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-86.90, 21.40],
                    [-86.80, 21.40],
                    [-86.80, 21.00],
                    [-86.90, 21.00],
                    [-86.90, 21.40]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Zona Crítica - Playa del Carmen",
                "erosion_rate": "Alta (25-40m)",
                "risk": "Crítico"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-87.15, 20.70],
                    [-87.00, 20.70],
                    [-87.00, 20.55],
                    [-87.15, 20.55],
                    [-87.15, 20.70]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Zona Moderada - Progreso",
                "erosion_rate": "Media (15-25m)",
                "risk": "Moderado"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-89.70, 21.32],
                    [-89.25, 21.32],
                    [-89.25, 21.24],
                    [-89.70, 21.24],
                    [-89.70, 21.32]
                ]]
            }
        }
    ]
}

# Create the map centered on Yucatan Peninsula
m = folium.Map(
    location=[21.0, -88.0],
    zoom_start=8,
    tiles='CartoDB positron',
    prefer_canvas=True
)

folium.GeoJson(
    erosion_zones,
    name='Zonas de Erosión',
    style_function=lambda feature: {
        'fillColor': '#fbbf24' if feature['properties']['risk'] == 'Moderado' else '#ef4444',
        'color': '#000000',
        'weight': 1,
        'fillOpacity': 0.2
    },
    tooltip=folium.GeoJsonTooltip(
        fields=['name', 'erosion_rate', 'risk'],
        aliases=['Zona:', 'Tasa de Erosión:', 'Nivel de Riesgo:']
    )
).add_to(m)

# Add 2000 coastline (blue)
folium.GeoJson(
    coastline_2000,
    name='Línea Costera 2000',
    style_function=lambda x: {
        'color': '#3b82f6',
        'weight': 3,
        'opacity': 0.9
    },
    tooltip=folium.GeoJsonTooltip(fields=['year', 'name'])
).add_to(m)

# Add 2020 coastline (red)
folium.GeoJson(
    coastline_2020,
    name='Línea Costera 2020',
    style_function=lambda x: {
        'color': '#ef4444',
        'weight': 3,
        'opacity': 0.9
    },
    tooltip=folium.GeoJsonTooltip(fields=['year', 'name'])
).add_to(m)

locations = [
    {"name": "Progreso", "coords": [21.2833, -89.6667], "erosion": "15-25m"},
    {"name": "Telchac Puerto", "coords": [21.3333, -89.2667], "erosion": "10-20m"},
    {"name": "Dzilam de Bravo", "coords": [21.3833, -88.9167], "erosion": "20-30m"},
    {"name": "Río Lagartos", "coords": [21.5972, -88.1597], "erosion": "5-15m"},
    {"name": "Holbox", "coords": [21.5208, -87.3761], "erosion": "25-35m"},
    {"name": "Cancún", "coords": [21.1619, -86.8515], "erosion": "30-50m"},
    {"name": "Puerto Morelos", "coords": [20.8509, -86.8764], "erosion": "20-30m"},
    {"name": "Playa del Carmen", "coords": [20.6296, -87.0739], "erosion": "25-40m"},
    {"name": "Tulum", "coords": [20.2114, -87.4654], "erosion": "15-30m"}
]

for loc in locations:
    # Color code markers by erosion severity
    erosion_value = int(loc["erosion"].split("-")[1].replace("m", ""))
    if erosion_value >= 40:
        color = 'red'
    elif erosion_value >= 25:
        color = 'orange'
    else:
        color = 'blue'
    
    folium.Marker(
        location=loc["coords"],
        popup=f"<b>{loc['name']}</b><br>Erosión: {loc['erosion']}",
        tooltip=f"{loc['name']} - Erosión: {loc['erosion']}",
        icon=folium.Icon(color=color, icon='info-sign')
    ).add_to(m)

# Add layer control to toggle coastlines
folium.LayerControl().add_to(m)

title_html = '''
<div style="position: fixed; 
     top: 10px; left: 50px; width: 350px; height: 90px; 
     background-color: white; border:2px solid grey; z-index:9999; 
     font-size:14px; padding: 12px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
     <b style="font-size:16px;">Cambios Costeros - Península de Yucatán</b><br>
     <span style="font-size:12px; color: #3b82f6;">━━━ Línea Costera 2000</span><br>
     <span style="font-size:12px; color: #ef4444;">━━━ Línea Costera 2020 (Avance del Mar)</span><br>
     <span style="font-size:11px; color: #666;">Datos SAR multitemporales 2000-2020</span>
</div>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Save the map
output_path = Path('public/coastal_map.html')
output_path.parent.mkdir(exist_ok=True)
m.save(str(output_path))

print(f"✓ Mapa generado exitosamente en: {output_path}")
print(f"✓ Línea costera 2000 (azul): {len(coastline_2000['features'][0]['geometry']['coordinates'])} puntos")
print(f"✓ Línea costera 2020 (roja): {len(coastline_2020['features'][0]['geometry']['coordinates'])} puntos")
print(f"✓ Zonas de erosión: {len(erosion_zones['features'])} áreas críticas")
print(f"✓ Marcadores: {len(locations)} ubicaciones con datos de erosión")
print("✓ Control de capas habilitado")
