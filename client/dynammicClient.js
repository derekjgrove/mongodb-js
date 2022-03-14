
print('collection --> ' + collection)
print('op --> ' + op)
print('filter --> ' + filter)

print(db[collection][op](JSON.parse(filter)))