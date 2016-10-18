import re



input_file = open("C:\\Users\\srsko\\OneDrive\\Documents\\GitHub\\InfoViz\\HW2\\2\\edges.csv", 'r')

output_file = open("C:\\Users\\srsko\\OneDrive\\Documents\\GitHub\\InfoViz\\HW2\\2\\edges2.csv", 'w')

rows = input_file.readlines()

output_file.write(rows[0])

rows.pop(0)

for row in rows:
	r = row.split('|')
	output_file.write(r[0] + ',' + r[1] + ',' + r[2])
	output_file.write(r[1] + ',' + r[0] + ',' + r[2])