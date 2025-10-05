import folium
from folium.plugins import TimestampedGeoJson
import json
from datetime import datetime
import random

# Generate plausible coastline data for Yucatan Peninsula
def generate_coastline_segment(base_coords, year, segment_id):
    """Generate a coastline segment with height data that changes over time"""
    # Base year is 2000, calculate years elapsed
    years_elapsed = year - 2000
    
    # Simulate erosion: height decreases over time (0.1-0.3m per year depending on location)
    erosion_rate = random.uniform(0.1, 0.3)
    base_height = random.uniform(2.0, 5.0)  # Initial height in meters
    current_height = max(0.5, base_height - (erosion_rate * years_elapsed))
    
    # Add some randomness to make it look more natural
    current_height += random.uniform(-0.2, 0.2)
    
    return {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": base_coords
        },
        "properties": {
            "time": f"{year}-01-01",
            "year": year,
            "height": round(current_height, 2),
            "segment_id": segment_id,
            "style": {
                "color": get_color_from_height(current_height),
                "weight": 6,
                "opacity": 0.8
            },
            "popup": f"<b>Año:</b> {year}<br><b>Altura:</b> {round(current_height, 2)}m<br><b>Segmento:</b> {segment_id}"
        }
    }

def get_color_from_height(height):
    """Convert height to color gradient (green=high/safe, red=low/danger)"""
    # Height range: 0.5m (critical) to 5.0m (safe)
    # Normalize to 0-1 range
    normalized = (height - 0.5) / (5.0 - 0.5)
    normalized = max(0, min(1, normalized))  # Clamp to 0-1
    
    # Color gradient: red -> yellow -> green
    if normalized < 0.5:
        # Red to Yellow
        r = 255
        g = int(255 * (normalized * 2))
        b = 0
    else:
        # Yellow to Green
        r = int(255 * (1 - (normalized - 0.5) * 2))
        g = 255
        b = 0
    
    return f'#{r:02x}{g:02x}{b:02x}'

# Define coastline segments for Yucatan Peninsula
coastline_segments = [
    # Northwest coast (Celestún area)
    [[-90.4, 21.6], [-90.2, 21.65], [-90.0, 21.7]],
    [[-90.0, 21.7], [-89.8, 21.72], [-89.6, 21.73]],
    
    # North coast (Progreso area)
    [[-89.6, 21.73], [-89.4, 21.75], [-89.2, 21.76]],
    [[-89.2, 21.76], [-89.0, 21.77], [-88.8, 21.78]],
    [[-88.8, 21.78], [-88.6, 21.79], [-88.4, 21.8]],
    
    # North-central coast (Telchac area)
    [[-88.4, 21.8], [-88.2, 21.82], [-88.0, 21.83]],
    [[-88.0, 21.83], [-87.8, 21.84], [-87.6, 21.85]],
    
    # Northeast coast (Holbox area)
    [[-87.6, 21.85], [-87.5, 21.8], [-87.4, 21.7]],
    [[-87.4, 21.7], [-87.3, 21.6], [-87.2, 21.5]],
    
    # East coast - Caribbean (Cancún area)
    [[-87.2, 21.5], [-87.1, 21.3], [-87.0, 21.1]],
    [[-87.0, 21.1], [-86.95, 20.9], [-86.9, 20.7]],
    
    # East coast - Caribbean (Playa del Carmen area)
    [[-86.9, 20.7], [-86.85, 20.5], [-86.8, 20.3]],
    [[-86.8, 20.3], [-86.75, 20.1], [-86.7, 19.9]],
    
    # Southeast coast (Tulum area)
    [[-86.7, 19.9], [-86.8, 19.7], [-86.9, 19.5]],
    [[-86.9, 19.5], [-87.0, 19.3], [-87.1, 19.1]],
    
    # South coast
    [[-87.1, 19.1], [-87.3, 19.0], [-87.5, 18.9]],
    [[-87.5, 18.9], [-87.7, 18.85], [-87.9, 18.8]],
]

# Generate data for all years
years = [2000, 2010, 2020, 2025, 2030]
features = []

for year in years:
    for idx, segment_coords in enumerate(coastline_segments):
        segment_id = f"Segmento {idx + 1}"
        feature = generate_coastline_segment(segment_coords, year, segment_id)
        features.append(feature)

# Create the map centered on Yucatan Peninsula
m = folium.Map(
    location=[20.5, -88.5],
    zoom_start=7,
    tiles='CartoDB positron'
)

# Create TimestampedGeoJson
timestamped_geojson = TimestampedGeoJson(
    {
        'type': 'FeatureCollection',
        'features': features
    },
    period='P1Y',  # Period of 1 year
    add_last_point=True,
    auto_play=True,
    loop=True,
    max_speed=2,
    loop_button=True,
    date_options='YYYY',
    time_slider_drag_update=True,
    duration='P10Y'  # Duration of 10 years
)

timestamped_geojson.add_to(m)

# Add a custom legend
legend_html = '''
<div style="position: fixed; 
            bottom: 50px; left: 50px; width: 200px; height: 140px; 
            background-color: white; border:2px solid grey; z-index:9999; 
            font-size:14px; padding: 10px">
    <p style="margin: 0 0 10px 0; font-weight: bold;">Altura de Costa (m)</p>
    <div style="display: flex; align-items: center; margin: 5px 0;">
        <div style="width: 30px; height: 15px; background: #00ff00; margin-right: 10px;"></div>
        <span>4.0-5.0m (Seguro)</span>
    </div>
    <div style="display: flex; align-items: center; margin: 5px 0;">
        <div style="width: 30px; height: 15px; background: #ffff00; margin-right: 10px;"></div>
        <span>2.5-4.0m (Moderado)</span>
    </div>
    <div style="display: flex; align-items: center; margin: 5px 0;">
        <div style="width: 30px; height: 15px; background: #ff0000; margin-right: 10px;"></div>
        <span>0.5-2.5m (Crítico)</span>
    </div>
</div>
'''
m.get_root().html.add_child(folium.Element(legend_html))

# Add title
title_html = '''
<div style="position: fixed; 
            top: 10px; left: 50%; transform: translateX(-50%);
            background-color: white; border:2px solid grey; z-index:9999; 
            font-size:18px; padding: 10px 20px; font-weight: bold;">
    Cambios Costeros - Península de Yucatán (2000-2030)
</div>
'''
m.get_root().html.add_child(folium.Element(title_html))

# Save the map
output_file = 'public/coastline_changes.html'
m.save(output_file)
print(f"✓ Mapa interactivo generado exitosamente: {output_file}")
print(f"✓ Años incluidos: {', '.join(map(str, years))}")
print(f"✓ Segmentos de costa: {len(coastline_segments)}")
print(f"✓ Total de features: {len(features)}")
